export function nextVideoIndex(current, length, direction = 1) {
  if (!Number.isInteger(length) || length < 1) return -1;
  return ((current + direction) % length + length) % length;
}

export function endedVideoIndex(current, length, autoNext) {
  return autoNext ? nextVideoIndex(current, length) : current;
}
