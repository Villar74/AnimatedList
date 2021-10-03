describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have contacts screen', async () => {
    await expect(element(by.id('contacts'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('icon_0')).tap();
    await expect(element(by.id('itemScreen'))).toBeVisible();
  });
});
