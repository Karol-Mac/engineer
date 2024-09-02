//Ten komponent zwraca guzik odpowiedzialny za powrót do poprzedniej strony odwiedzonej przez uzytkownika
//Jest to górny pasek zawierający logo, oraz przyciski do ulubionych produktów, logowania , rejesracji , profilu i wyświetlenia menu zarządzania profilu

import {useEffect, useSTate} from "react";
import {NavigateFunctions} from "../functions/NavigateFunctions" //not imported as default therefore it has to be in curly brackets

const RollbackPageButton = () => {
    const {returnToPreviousPage} = NavigateFunctions();

    return(
        <button onClick={returnToPreviousPage} id="ReturnButton">Return</button>
    );
};

export default RollbackPageButton;

