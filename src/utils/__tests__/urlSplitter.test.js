import urlSplitter, { isURL } from "../urlSplitter";

describe("urlSplitter", () => {
    describe("isURL()", () => {
        test("should return true if provided text matches URL pattern", () => {
            const testCase1 = isURL(
                "https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url"
            );
            const testCase2 = isURL("http://www.youtube.com/");
            const testCase3 = isURL(
                "www.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split"
            );

            expect(testCase1).toBe(true);
            expect(testCase2).toBe(true);
            expect(testCase3).toBe(true);
        });

        test("should return false if provided text doesn't match URL pattern", () => {
            const testCase1 = isURL("Hello world");
            const testCase2 = isURL("www.");
            const testCase3 = isURL("https://hello");

            expect(testCase1).toBe(false);
            expect(testCase2).toBe(false);
            expect(testCase3).toBe(false);
        });
    });

    describe("detectAndSplitURLs", () => {
        test("should find a URL in a text and split the text into an array with the URL as a separate item", () => {
            const output = urlSplitter("My website is www.google.com");

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(2);
            expect(output).toEqual(["My website is ", "www.google.com"]);
        });

        test("should find several URLs in a text and split each of them into a separate item", () => {
            const output = urlSplitter(
                "My two favorite websites are www.google.com and www.twitter.com."
            );

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(4);
            expect(output).toEqual([
                "My two favorite websites are ",
                "www.google.com",
                " and ",
                "www.twitter.com.",
            ]);
        });

        test("should return the full string as a single item in an array if no URLs exist", () => {
            const output = urlSplitter("This is my URL-free text");

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(1);
            expect(output).toEqual(["This is my URL-free text"]);
        });
    });
});
