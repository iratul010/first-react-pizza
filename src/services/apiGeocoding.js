export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
//'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224%2C-73.961452&key=YOUR_API_KEY&fbclid=IwAR0qYp3IW9djxdOi1KOZVBXj3RIObp8kjP2aUTQVaqyPfnIeXT18hf_D0Q0'
