import splitTweet from "../tweetSplitter";

describe("tweetSplitter", () => {
    describe("splitTweet", () => {
        test("should split tweet shorter than the maxmium tweet length if the user provides split points", () => {
            const testCase = splitTweet(
                "This is the first sentence.(---)This is the second sentence."
            );

            expect(testCase).toBeInstanceOf(Array);
            expect(testCase).toHaveLength(2);
            expect(testCase).toContain("This is the first sentence.");
            expect(testCase).toContain("This is the second sentence.");
        });

        test("should split tweets at user defined points then handle any tweets that are still longer than the maxmium tweet length", () => {
            const testCase = splitTweet(
                "This weekend at the Marché du Film, the market counterpart of Cannes Film Festival, Chile will present five animated films in search of partners.(---) For a country that has barely released a dozen animated features in its entire history, this is a watershed.\n\nThe five features will be presented on Saturday, July 10 as part of the market’s Animation Days segment. They vary widely in themes, tone, and technique, ranging from 2d to cgi, and road-trip comedies to wartime dramas. Yet the stories are all steeped in the country of their origin, depicting the history, politics, traditions, and landscapes of Chile."
            );

            expect(testCase).toBeInstanceOf(Array);
            expect(testCase).toHaveLength(3);
            expect(testCase).toContain(
                "This weekend at the Marché du Film, the market counterpart of Cannes Film Festival, Chile will present five animated films in search of partners."
            );
            expect(testCase).toContain(
                "For a country that has barely released a dozen animated features in its entire history, this is a watershed.\n\nThe five features will be presented on Saturday, July 10 as part of the market’s Animation Days segment."
            );
            expect(testCase).toContain(
                "They vary widely in themes, tone, and technique, ranging from 2d to cgi, and road-trip comedies to wartime dramas. Yet the stories are all steeped in the country of their origin, depicting the history, politics, traditions, and landscapes of Chile."
            );
        });

        test("should split text that doesn't have user-defined split points if it is longer than the maxmium tweet length", () => {
            const testCase1 = splitTweet(
                "This weekend at the Marché du Film, the market counterpart of Cannes Film Festival, Chile will present five animated films in search of partners. For a country that has barely released a dozen animated features in its entire history, this is a watershed.\n\nThe five features will be presented on Saturday, July 10 as part of the market’s Animation Days segment. They vary widely in themes, tone, and technique, ranging from 2d to cgi, and road-trip comedies to wartime dramas. Yet the stories are all steeped in the country of their origin, depicting the history, politics, traditions, and landscapes of Chile."
            );

            expect(testCase1).toBeInstanceOf(Array);
            expect(testCase1).toHaveLength(3);
            expect(testCase1).toContain(
                "This weekend at the Marché du Film, the market counterpart of Cannes Film Festival, Chile will present five animated films in search of partners. For a country that has barely released a dozen animated features in its entire history, this is a watershed."
            );
            expect(testCase1).toContain(
                "The five features will be presented on Saturday, July 10 as part of the market’s Animation Days segment. They vary widely in themes, tone, and technique, ranging from 2d to cgi, and road-trip comedies to wartime dramas."
            );
            expect(testCase1).toContain(
                "Yet the stories are all steeped in the country of their origin, depicting the history, politics, traditions, and landscapes of Chile."
            );

            const testCase2 = splitTweet(
                "As Cristián Freire, coordinator for the Chilean Animation delegation at Cannes 2021, tells Cartoon Brew, “In the last ten years, the quantity and quality of Chilean [animation] studios has grown enormously, with better prepared artists in the discipline, access to technological tools, and institutional support”\nThis growth is buttressed by a three-pronged state funding system The economic development agency CORFO supports series and features in their early stages CNTV, the agency that oversees tv services, invests in many animated series Finally, the Audiovisual Fund of the Ministry of Cultures, Arts and Heritage covers all stages of the development and production of animated features, shorts, and webseries\nAll features at the Marché du Film benefited from it"
            );

            expect(testCase2).toBeInstanceOf(Array);
            expect(testCase2).toHaveLength(5);
            expect(testCase2).toContain(
                "As Cristián Freire, coordinator for the Chilean Animation delegation at Cannes 2021, tells Cartoon Brew, “In the last ten years, the quantity and quality of Chilean [animation] studios has grown enormously, with better prepared artists in the discipline, access to..."
            );
            expect(testCase2).toContain(
                "technological tools, and institutional support”"
            );
            expect(testCase2).toContain(
                "This growth is buttressed by a three-pronged state funding system The economic development agency CORFO supports series and features in their early stages CNTV, the agency that oversees tv services, invests in many animated series Finally, the Audiovisual Fund of the Ministry..."
            );
            expect(testCase2).toContain(
                "of Cultures, Arts and Heritage covers all stages of the development and production of animated features, shorts, and webseries"
            );
            expect(testCase2).toContain(
                "All features at the Marché du Film benefited from it"
            );

            const testCase3 = splitTweet(
                "Yet the cost of animation production is such that local money alone can’t necessarily cover aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa full feature."
            );

            expect(testCase3).toBeInstanceOf(Array);
            expect(testCase3).toHaveLength(2);
            expect(testCase3).toContain(
                "Yet the cost of animation production is such that local money alone can’t necessarily cover..."
            );
            expect(testCase3).toContain(
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa full feature."
            );

            const testCase4 = splitTweet(
                "Yet the cost of animation production is such that local money alone can’t necessarily cover aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa full feature."
            );

            expect(testCase4).toBeInstanceOf(Array);
            expect(testCase4).toHaveLength(3);
            expect(testCase4).toContain(
                "Yet the cost of animation production is such that local money alone can’t necessarily cover..."
            );
            expect(testCase4).toContain(
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..."
            );
            expect(testCase4).toContain(
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa full feature."
            );
        });
    });
});
