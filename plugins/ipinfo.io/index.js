async function search_ip({ip: ip}) {
  console.log("ip", ip)
  return await fetch(`https://ipinfo.io/${ip}/json`).then((res) => res.json())
}
