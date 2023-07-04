async function search_ip({ip: ip}) {
  if (!ip)
    return ;
  ais_progress(`searching ${ip}`)
  return await fetch(`https://ipinfo.io/${ip}/json`).then((res) => res.json())
}
