function IPvalidation(ip, keyboardEvent) {
  let ipSplit = ip.split('.');
  let countOctet = ipSplit.length;
  if (countOctet === 4 && !isNaN(keyboardEvent.key))
    return true;
  return false;
}