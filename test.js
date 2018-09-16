const {Builder, By, Capabilities} = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
const timeOut = 15000;

describe('Testing', async function(done) {
    let driver;
    this.timeout(timeOut);

    before(async () => {
        driver = new Builder().withCapabilities(Capabilities.chrome()).build();
        await driver.get('http://localhost:9080');
    });

    after(async () => {
       driver.quit();
    });

    it('I can see title', async () => {
        await expect(driver.findElement(By.css('h1')).getText()).to.eventually.contain('Test page');
    });

    it('I can see opened ads tab', async () => {
        await driver.findElement(By.css('body')).click();
        await expect(driver.getTitle()).to.eventually.contain('Google');
    });

    it('I switch tab and see source site', async () => {
        let tabs = await driver.getAllWindowHandles();
        await driver.switchTo().window(tabs[1]);
        await expect(driver.findElement(By.css('h1')).getText()).to.eventually.contain('Test page');
    });
});
