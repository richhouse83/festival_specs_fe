import { Header } from "@mantine/core";
import { Link } from "react-router-dom";

export const MainHeader = ({returnLink}: {returnLink: string | undefined}) => {

  const returnLinkMap = returnLink?.split('/').map((word, index, array) => {
    const link = 'festival_specs_fe/' + array.slice(0, index + 1).join('/');
    if (['festivals', 'stages', 'artists'].includes(word)) {
    return <Link key={word} to={link}>{word}/</Link>
    }
    return <>{word}/</>
  })
  return (
    <Header id="header" height={60} padding="xs">
      <div>FestivalSpecs Utility</div>
      <div>
        {returnLinkMap}
      </div>
    </Header>
  )
}