import { Table, Checkbox, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom';
import { Artist } from '../Interfaces'

export function ArtistExpandedFields ({ artist, festivalName, stageName }: {artist: Artist, festivalName: string | undefined, stageName: string | undefined}) {
  const navigate = useNavigate();

  const navigation = () => navigate(`/festival_specs_fe/festivals/${festivalName}/stages/${stageName}/artists/${artist.artist_name}`)

  return (
      <td colSpan={4} className={'extended-details'}>
        <Table>
          <thead>
            <tr>
              <th>Type of Show</th>
              <th>Specs In?</th>
              <th>Pips sent?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{artist.type_of_show}</td>
              <td>
                <Checkbox checked={artist.specs_in} readOnly />
              </td>
              <td>
                <Checkbox checked={artist.pips_sent} readOnly />
              </td>
            </tr>
          </tbody>
        </Table>
        <Table>
          <thead>
            <tr>
              <th>Advance Contact</th>
              <th>Production Manager</th>
              <th>Tour Manager</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{artist.advance_contact || "No Contact"}</td>
              <td>{artist.production_manager_contact || "No Contact"}</td>
              <td>{artist.tour_manager_contact || "No Contact"}</td>
            </tr>
          </tbody>
        </Table>
        <Button onClick={navigation}>Full Details</Button>
      </td>
  );
}