const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export default {
  get oneWeekFromNow(): number {
    return +new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  },
  get now(): number {
    return +new Date();
  },
  get secondsUntilNextHour(): number {
    return Math.round(3600000 - (new Date().getTime() % 3600000) / 1000);
  },
  get twelveHoursInSeconds(): number {
    return 43200;
  },
  get secondsUntilNextDay(): number {
    // Current date
    const now = new Date();

    return Math.round(
      24 * 60 * 60 - now.getHours() * 60 * 60 - now.getMinutes() * 60 - now.getSeconds(),
    );
  },
  diffFromNow(date) {
    // Now date
    const now = new Date();

    // Target date
    const target = new Date(date);

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const utc2 = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());

    // Get real diff
    const diff = Math.floor((utc2 - utc1) / _MS_PER_DAY);

    // Return just positive numbers
    return Math.max(0, diff);
  },
};
