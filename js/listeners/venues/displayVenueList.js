import { getVenues } from "../../api/venues/getVenues.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderVenueList } from "../../ui/venues/renderVenueList.js";

export async function displayVenueList() {
  const container = document.querySelector("#venue-container");

  try {
    const venues = await getVenues();
    renderVenueList(container, venues.data);
  } catch (error) {
    console.log(error);
    displayMessage(container, "error", error.message);
  }
}
