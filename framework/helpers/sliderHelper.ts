import { Locator, Page } from '@playwright/test';

/**
 * @param {Page} page - page context
 * @param {Locator} slider - slider locator
 * @param {number} target - desired value of slider input
 */
export const setSliderValue = async (
  page: Page,
  slider: Locator,
  target: number
): Promise<void> => {
  const sliderDims = await slider.evaluate((el) => {
    return {
      maxWidth: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
      min: Number(el.getAttribute('min')), // min slider range
      max: Number(el.getAttribute('max')), // max slider range
    };
  });

  if (sliderDims.min > target || sliderDims.max < target || target % 1 !== 0) {
    // not correct value handling
    throw new Error(`Not correct range parameter - ${target}!`);
  }

  const initTarget = target;
  let counter = 0;
  const maxAttempts = 30;
  const setValue = async (sliderDims, target: number) => {
    const { maxWidth, height, min: inputMin, max: inputMax } = sliderDims;
    const targetPosition = (maxWidth * target) / inputMax;
    // Using the hover method to place the mouse cursor then moving it to the right
    await slider.hover({
      force: true,
      position: { x: 0, y: height / 2 },
      trial: true,
    });
    await page.mouse.down();
    await slider.hover({
      force: true,
      position: { x: targetPosition, y: height / 2 },
      trial: true,
    });
    await page.mouse.up();

    // almost impossible to set slider value with first attempt
    // safe recursion added for setting desired value
    const currentValue = Number(await slider.inputValue());
    let offsetPitch = 0.5;
    if (counter > maxAttempts) {
      throw new Error(
        `Can not set slider value = ${initTarget} after ${
          counter - 1
        } attempts!`
      );
    }
    if (currentValue > initTarget && counter <= maxAttempts) {
      const newTarget = target - offsetPitch;
      counter++;
      await setValue(sliderDims, newTarget);
    } else if (currentValue < initTarget && counter <= maxAttempts) {
      const newTarget = target + offsetPitch;
      counter++;
      await setValue(sliderDims, newTarget);
    }
  };

  await setValue(sliderDims, target);
};
