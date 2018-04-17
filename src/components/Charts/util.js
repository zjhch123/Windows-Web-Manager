export function persentScale () {
  const cols = {
    percent: {
      formatter: val => {
        val = (val * 100) + '%';
        return val;
      }
    }
  } 
  return cols
}