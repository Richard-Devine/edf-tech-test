# Javascript Code Test

### Notes

- I have done a couple of tests to demonstrate my knowledge however I don't know XML well enough to mock an XML response from the fetch request so have not added that into the test suite.
- Waterstones API doesn't work, I have only added it to show how you could add another seller with minimal overhead
- I didn't adhere to conventional commits and messages as this is a test and not production code

### Changes

- Original class refactored to a function
- Config file added for ease of adding new book vendors
- Converted to Typescript for type safety
- Unit tests added
- Dynamic query params builder added

Things you will be asked about:

1. How could you easily add other book seller APIs in the the future
2. How would you manage differences in response payloads between different APIs without needing to make future changes to whatever code you have in example-client.js
3. How would you implement different query types for example: by publisher, by year published etc
4. How your code would be tested
