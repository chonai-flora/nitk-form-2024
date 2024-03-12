export const formatCapacity = (capacity: number): string => {
    return capacity > 0
        ? `残り${capacity}人`
        : `終了しました`;
}