import { devices, test } from '@playwright/test';
test.use({
	...devices['iPhone 13 Pro'],
	locale: 'en-US',
	geolocation: { longitude: 12.492507, latitude: 41.889938 },
	permissions: ['geolocation']
});
// test
test('about page has expected h1', async ({ page }) => {
	await page.goto('/jobs');
	await page.screenshot({ path: `example.png` });
});
