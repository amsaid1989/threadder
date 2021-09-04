import { getColumn, getRow } from "../gridPlacement";

describe("gridPlacement", () => {
    describe("getColumn", () => {
        test("should return the correct start and end column for each item depending on the number of items in the grid", () => {
            let [colStart, colEnd] = getColumn(0, 1);
            expect(colStart).toBe(1);
            expect(colEnd).toBe(3);

            [colStart, colEnd] = getColumn(0, 2);
            expect(colStart).toBe(1);
            expect(colEnd).toBe(2);

            [colStart, colEnd] = getColumn(0, 3);
            expect(colStart).toBe(1);
            expect(colEnd).toBe(2);

            [colStart, colEnd] = getColumn(0, 4);
            expect(colStart).toBe(1);
            expect(colEnd).toBe(2);

            [colStart, colEnd] = getColumn(1, 2);
            expect(colStart).toBe(2);
            expect(colEnd).toBe(3);

            [colStart, colEnd] = getColumn(1, 3);
            expect(colStart).toBe(2);
            expect(colEnd).toBe(3);

            [colStart, colEnd] = getColumn(1, 4);
            expect(colStart).toBe(2);
            expect(colEnd).toBe(3);

            [colStart, colEnd] = getColumn(2, 3);
            expect(colStart).toBe(1);
            expect(colEnd).toBe(3);

            [colStart, colEnd] = getColumn(2, 4);
            expect(colStart).toBe(1);
            expect(colEnd).toBe(2);

            [colStart, colEnd] = getColumn(3, 4);
            expect(colStart).toBe(2);
            expect(colEnd).toBe(3);
        });
    });

    describe("getRow", () => {
        test("should return the correct start and end row for each item depending on the number of items in the grid", () => {
            let [rowStart, rowEnd] = getRow(0, 1);
            expect(rowStart).toBe(1);
            expect(rowEnd).toBe(3);

            [rowStart, rowEnd] = getRow(0, 2);
            expect(rowStart).toBe(1);
            expect(rowEnd).toBe(3);

            [rowStart, rowEnd] = getRow(0, 3);
            expect(rowStart).toBe(1);
            expect(rowEnd).toBe(2);

            [rowStart, rowEnd] = getRow(0, 4);
            expect(rowStart).toBe(1);
            expect(rowEnd).toBe(2);

            [rowStart, rowEnd] = getRow(1, 2);
            expect(rowStart).toBe(1);
            expect(rowEnd).toBe(3);

            [rowStart, rowEnd] = getRow(1, 3);
            expect(rowStart).toBe(1);
            expect(rowEnd).toBe(2);

            [rowStart, rowEnd] = getRow(1, 4);
            expect(rowStart).toBe(1);
            expect(rowEnd).toBe(2);

            [rowStart, rowEnd] = getRow(2, 3);
            expect(rowStart).toBe(2);
            expect(rowEnd).toBe(3);

            [rowStart, rowEnd] = getRow(2, 4);
            expect(rowStart).toBe(2);
            expect(rowEnd).toBe(3);

            [rowStart, rowEnd] = getRow(3, 4);
            expect(rowStart).toBe(2);
            expect(rowEnd).toBe(3);
        });
    });
});
