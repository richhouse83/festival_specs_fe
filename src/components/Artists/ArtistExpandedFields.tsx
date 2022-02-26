import { useState, useEffect, MouseEventHandler, BaseSyntheticEvent } from "react";
import { Table, Checkbox, TextInput, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { DateSelector } from '../DateSelector';
import { Artist } from "../Interfaces";
import * as api from '../../utils/api';

export function ArtistExpandedFields({
  artist,
  festivalName,
  stageName,
  handleClick,
  dates,
  setArtistsInView,
  setArtists,
}: {
  artist: Artist;
  festivalName: string | undefined;
  stageName: string | undefined;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  dates: Date[];
  setArtistsInView:  Function;
  setArtists:  Function;
}) {
  const [newArtist, setNewArtist]: [Artist | undefined, Function] = useState();
  const [updated, setUpdated] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setNewArtist(artist);
  }, [artist]);

  const updateParam = (value: any, param: string) => {
    setUploading(false);
    setUpdated(true);
    setNewArtist((prev: Artist) => {
      const changedArtist = {
        ...prev,
        [param]: value,
      };
      return changedArtist;
    });
  };

  const submitForm = (event: BaseSyntheticEvent) => {
    setUpdated(false);
    setUploading(true);
    event.preventDefault();
    return api.updateArtist(festivalName, stageName, artist?.artist_name, newArtist)
      .then((returnedArtist: Artist) => {
        setNewArtist(returnedArtist)
        setArtistsInView((prevArtists: Artist[]) => {
          const newArtists = [...prevArtists]
          const index = newArtists.findIndex((artistToCheck) => artistToCheck.artist_key === returnedArtist.artist_key)
          newArtists.splice(index, 1, returnedArtist);
          return newArtists;
        })
        setArtists((prevArtists: Artist[]) => {
          const newArtists = [...prevArtists]
          const index = newArtists.findIndex((artistToCheck) => artistToCheck.artist_key === returnedArtist.artist_key)
          newArtists.splice(index, 1, returnedArtist);
          return newArtists;
        })
        setUploading(false);
        setUpdated(true)
      })
  }

  const navigate = useNavigate();

  const navigation = () =>
    navigate(
      `/festival_specs_fe/festivals/${festivalName}/stages/${stageName}/artists/${artist.artist_name}`
    );

  return (
    <>
      <tr>
        <td>
          <TextInput
            value={newArtist?.artist_name || ""}
            placeholder="No Contact"
            onChange={(event) => updateParam(event.target.value, "artist_name")}
          />
        </td>
        <td><DateSelector showLabel={false} dates={dates} value={new Date(newArtist?.date || Date.now())} required onChange={(value: Date) => updateParam(value.toISOString(), 'date')}/></td>
        <td>
          <TextInput
            value={newArtist?.start_time || ""}
            placeholder="No Contact"
            onChange={(event) => updateParam(event.target.value, "start_time")}
          />
        </td>
        <td>
          <TextInput
            value={newArtist?.end_time || ""}
            placeholder="No Contact"
            onChange={(event) => updateParam(event.target.value, "end_time")}
          />
        </td>
      </tr>
      <tr>
        <td colSpan={4} className={"extended-details"}>
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
                <td>
                  <TextInput
                    value={newArtist?.type_of_show || ""}
                    onChange={(event) =>
                      updateParam(event.target.value, "type_of_show")
                    }
                  />
                </td>
                <td>
                  <Checkbox
                    defaultChecked={newArtist?.specs_in}
                    onChange={(event) =>
                      updateParam(event.target.checked, "specs_in")
                    }
                  />
                </td>
                <td>
                  <Checkbox
                    defaultChecked={newArtist?.pips_sent}
                    onChange={(event) =>
                      updateParam(event.target.checked, "pips_in")
                    }
                  />
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
                <td>
                  <TextInput
                    value={newArtist?.advance_contact || ""}
                    placeholder="No Contact"
                    onChange={(event) =>
                      updateParam(event.target.value, "advance_contact")
                    }
                  />
                </td>
                <td>
                  <TextInput
                    value={newArtist?.production_manager_contact || ""}
                    placeholder="No Contact"
                    onChange={(event) =>
                      updateParam(
                        event.target.value,
                        "production_manager_contact"
                      )
                    }
                  />
                </td>
                <td>
                  <TextInput
                    value={newArtist?.tour_manager_contact || ""}
                    placeholder="No Contact"
                    onChange={(event) =>
                      updateParam(event.target.value, "tour_manager_contact")
                    }
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <div>
            <Menu>
              <Menu.Item
                onClick={submitForm}
                disabled={!updated}
              >
                Quick Update
              </Menu.Item>
              <Menu.Item onClick={navigation}>Full Details</Menu.Item>
              <Menu.Item onClick={handleClick}>Close</Menu.Item>
            </Menu>
          </div>
          {updated && <p>Not Saved</p>}
          <BeatLoader loading={uploading}/>
        </td>
      </tr>
    </>
  );
}
