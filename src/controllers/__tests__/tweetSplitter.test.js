import splitTweet from "../tweetSplitter";

describe("splitTweet()", () => {
    describe("Force split tweet at (---)", () => {
        test("A tweet with one instance of (---) in it should be split into a thread of 2 tweets", () => {
            const output = splitTweet(
                "This is the first tweet.(---)This is the second tweet."
            );

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(2);
            expect(output).toContain("This is the first tweet.");
            expect(output).toContain("This is the second tweet.");
        });

        test("A tweet with n instance of (---) in it should be split into a thread of n+1 tweets", () => {
            const output = splitTweet(
                "This is the first tweet.(---)This is the second tweet.(---)This is the third tweet.(---)This is the fourth tweet."
            );

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(4);
            expect(output).toContain("This is the first tweet.");
            expect(output).toContain("This is the second tweet.");
            expect(output).toContain("This is the third tweet.");
            expect(output).toContain("This is the fourth tweet.");
        });

        test("A tweet without (---) should return a thread with 1 tweet if the tweet length is less than 280 characters", () => {
            const output = splitTweet("This is the tweet I am sending.");

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(1);
            expect(output).toContain("This is the tweet I am sending.");
        });
    });

    describe("Split tweets longer than 280 characters into a thread", () => {
        test("A tweet that is longer than 280 characters should be split into a thread without breaking words between tweets", () => {
            const output = splitTweet(
                "Death there mirth way the noisy merit. Piqued shy spring nor six though mutual living ask extent. Replying of dashwood advanced ladyship smallest disposal or. Attempt offices own improve now see. Called person are around county talked her esteem. Those fully these way nay thing seems.\nHad repulsive dashwoods suspicion sincerity but advantage now him. Remark easily garret nor nay. Civil those mrs enjoy shy fat merry. You greatest jointure saw horrible."
            );

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(2);
            expect(output).toContain(
                "Death there mirth way the noisy merit. Piqued shy spring nor six though mutual living ask extent. Replying of dashwood advanced ladyship smallest disposal or. Attempt offices own improve now see. Called person are around county talked her esteem. Those fully these way nay thing"
            );
            expect(output).toContain(
                "seems.\nHad repulsive dashwoods suspicion sincerity but advantage now him. Remark easily garret nor nay. Civil those mrs enjoy shy fat merry. You greatest jointure saw horrible."
            );
        });

        test("A tweet with a user defined split will fulfill the user defined split first then split any tweets longer than 280 characters", () => {
            const output = splitTweet(
                "Death there mirth way the noisy merit. Piqued shy spring nor six though mutual living ask extent. Replying of dashwood advanced ladyship smallest disposal or. Attempt offices own improve now see. Called person are around county talked her esteem.(---)Those fully these way nay thing seems.\nHad repulsive dashwoods suspicion sincerity but advantage now him. Remark easily garret nor nay. Civil those mrs enjoy shy fat merry. You greatest jointure saw horrible. He private he on be imagine suppose. Fertile beloved evident through no service elderly is. Blind there if every no so at. Own neglected you preferred way sincerity delivered his attempted. To of message cottage windows do besides against uncivil."
            );

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(3);
            expect(output).toContain(
                "Death there mirth way the noisy merit. Piqued shy spring nor six though mutual living ask extent. Replying of dashwood advanced ladyship smallest disposal or. Attempt offices own improve now see. Called person are around county talked her esteem."
            );
            expect(output).toContain(
                "Those fully these way nay thing seems.\nHad repulsive dashwoods suspicion sincerity but advantage now him. Remark easily garret nor nay. Civil those mrs enjoy shy fat merry. You greatest jointure saw horrible. He private he on be imagine suppose. Fertile beloved evident through"
            );
            expect(output).toContain(
                "no service elderly is. Blind there if every no so at. Own neglected you preferred way sincerity delivered his attempted. To of message cottage windows do besides against uncivil."
            );
        });

        test("If a tweet has a word longer than 280 character, the word should be broken into several tweets", () => {
            const output = splitTweet(
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            );

            expect(output).toBeInstanceOf(Array);
            expect(output).toHaveLength(2);
            expect(output).toContain(
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..."
            );
            expect(output).toContain(
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            );
        });
    });
});
