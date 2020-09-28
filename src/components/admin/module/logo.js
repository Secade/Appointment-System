import React from "react";
import { Image } from "semantic-ui-react";
function Logo() {
    return (
        <Image
            centered
            size="massive"
            id="image"
            data-testid="image"
            src="img/Access Dental Clinic Trans.png"
        />
    );
}

export default Logo;
