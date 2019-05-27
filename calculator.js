function ipSplit(ip) {
  if (ip.indexOf('/') === -1) {
    return ip.split('.');
  } else {
    ip = ip.split('.');
    ip[4] = ip[3].split('/')[1];
    ip[3] = ip[3].split('/')[0];
    return ip;
  }
}

function ipValidation(ip, keyboardEvent) {
  if (
    ipSplit(ip).length > 4 &&
    ipSplit(ip)[4].length > 1 &&
    keyboardEvent.key == 'Enter'
  )
    return true;
  return false;
}

function getClass(ip) {
  ip = ip.split('.');
  if (ip[0] > 0 && ip[0] < 127) return 'A';
  else if (ip[0] > 127 && ip[0] < 192) return 'B';
  else if (ip[0] > 191 && ip[0] < 224) return 'C';
  else return 'undefined';
}

function getTheNumberOfHosts(typeNetwork) {
  if (isNaN(typeNetwork)) 
    typeNetwork = typeNetwork.split('/')[1];
  return ((2 ** ((32 - typeNetwork))) - 2);
}

function getCidr(ip) {
  return `/${ipSplit(ip)[4]}`;
}

function convertDecimalToBinary(ip, typeResult = 'object') {
  ip = ip.split('.');
  let sum = 0;
  const sequence = [128, 64, 32, 16, 8, 4, 2, 1];

  let result = [
    { decimal: ip[0], binary: '' },
    { decimal: ip[1], binary: '' },
    { decimal: ip[2], binary: '' },
    { decimal: ip[3], binary: '' }
  ];

  result.forEach(octet => {
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] < octet.decimal) {
        octet.binary += 1;
        sum = sequence[i];
        for (let j = i + 1; j < sequence.length; j++) {
          if (sum + sequence[j] <= octet.decimal) {
            sum += sequence[j];
            octet.binary += 1;
          } else {
            octet.binary += 0;
          }
        }
        break;
      } else {
        octet.binary += 0;
      }
    }
  });

  return (typeResult === 'binary') ? 
    result[0].binary + result[1].binary + result[2].binary + result[3].binary : result;
}

function listenIpInput(callbackFunction) {
  const $ip = document.querySelector('#ip');
  $ip.addEventListener('keydown', e => {
    callbackFunction($ip.value, e);
  });
}

function showResult(...result) {
  document.querySelector('#mask').value = result[0];
  document.querySelector('#cidr').value = result[0];
  document.querySelector('#class').value = result[1];
  document.querySelector('#sub').value = result[3];
  document.querySelector('#host').value = result[2];
  document.querySelector('#binary').value = result[3];
}