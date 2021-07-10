import { fsHandler } from "../fullSentenceHandler";

describe("fullSentenceHandler", () => {
    describe("trimTopAndTailSpaces", () => {
        test("should remove any number of spaces or tabs at the top and tail of a string", () => {
            const output = fsHandler.trimTopAndTailSpaces(
                "        Hello World                 "
            );

            expect(output).toBe("Hello World");
        });

        test("should not remove any newline characters", () => {
            const output = fsHandler.trimTopAndTailSpaces(
                "\n\n\n\n\n\nHello World\n\n\n\n"
            );

            expect(output).toBe("\n\n\n\n\n\nHello World\n\n\n\n");
        });
    });

    describe("splitAtFullstops", () => {
        test("should take any text that has full stops and split it into an array of single sentences that each contain a full stop at the end", () => {
            const testCase1 = fsHandler.splitAtFullstops(
                `In Marvel Studios' action-packed spy thriller "Black Widow," Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.`
            );

            expect(testCase1).toBeInstanceOf(Array);
            expect(testCase1).toHaveLength(2);
            expect(testCase1).toContain(
                `In Marvel Studios' action-packed spy thriller "Black Widow," Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.`
            );
            expect(testCase1).toContain(
                `Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.`
            );

            const testCase2 = fsHandler.splitAtFullstops(
                `This weekend at the Marché du Film, the market counterpart of Cannes Film Festival, Chile will present five animated films in search of partners. For a country that has barely released a dozen animated features in its entire history, this is a watershed.\n\nThe five features will be presented on Saturday, July 10 as part of the market’s Animation Days segment. They vary widely in themes, tone, and technique, ranging from 2d to cgi, and road-trip comedies to wartime dramas. Yet the stories are all steeped in the country of their origin, depicting the history, politics, traditions, and landscapes of Chile.`
            );

            expect(testCase2).toBeInstanceOf(Array);
            expect(testCase2).toHaveLength(5);
            expect(testCase2).toContain(
                `This weekend at the Marché du Film, the market counterpart of Cannes Film Festival, Chile will present five animated films in search of partners.`
            );
            expect(testCase2).toContain(
                `For a country that has barely released a dozen animated features in its entire history, this is a watershed.`
            );
            expect(testCase2).toContain(
                `\n\nThe five features will be presented on Saturday, July 10 as part of the market’s Animation Days segment.`
            );
            expect(testCase2).toContain(
                `They vary widely in themes, tone, and technique, ranging from 2d to cgi, and road-trip comedies to wartime dramas.`
            );
            expect(testCase2).toContain(
                `Yet the stories are all steeped in the country of their origin, depicting the history, politics, traditions, and landscapes of Chile.`
            );
        });
    });

    describe("combineSentencesIntoTweets", () => {
        test("should iterate over an array of single sentences and combine them into an array of multi-sentence tweets", () => {
            const testCase1 = fsHandler.combineSentencesIntoTweets(
                fsHandler.splitAtFullstops(
                    `In Marvel Studios' action-packed spy thriller "Black Widow," Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.`
                )
            );

            expect(testCase1).toBeInstanceOf(Array);
            expect(testCase1).toHaveLength(2);
            expect(testCase1).toContain(
                `In Marvel Studios' action-packed spy thriller "Black Widow," Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.`
            );
            expect(testCase1).toContain(
                `Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.`
            );

            const testCase2 = fsHandler.combineSentencesIntoTweets(
                fsHandler.splitAtFullstops(
                    `This weekend at the Marché du Film, the market counterpart of Cannes Film Festival, Chile will present five animated films in search of partners. For a country that has barely released a dozen animated features in its entire history, this is a watershed.\n\nThe five features will be presented on Saturday, July 10 as part of the market’s Animation Days segment. They vary widely in themes, tone, and technique, ranging from 2d to cgi, and road-trip comedies to wartime dramas. Yet the stories are all steeped in the country of their origin, depicting the history, politics, traditions, and landscapes of Chile.`
                )
            );

            expect(testCase2).toBeInstanceOf(Array);
            expect(testCase2).toHaveLength(3);
            expect(testCase2).toContain(
                `This weekend at the Marché du Film, the market counterpart of Cannes Film Festival, Chile will present five animated films in search of partners. For a country that has barely released a dozen animated features in its entire history, this is a watershed.`
            );
            expect(testCase2).toContain(
                `\n\nThe five features will be presented on Saturday, July 10 as part of the market’s Animation Days segment. They vary widely in themes, tone, and technique, ranging from 2d to cgi, and road-trip comedies to wartime dramas.`
            );
            expect(testCase2).toContain(
                `Yet the stories are all steeped in the country of their origin, depicting the history, politics, traditions, and landscapes of Chile.`
            );
        });
    });
});
