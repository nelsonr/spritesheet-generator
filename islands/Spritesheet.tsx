/** @jsx h */
import { createRef, h } from "preact";
import { useState } from "preact/hooks";

export default function Spritesheet() {
    const [status, setStatus] = useState("");

    const fileInputRef = createRef();
    const endpoint = "/api/spritesheet";

    const onSubmit = (ev: Event) => {
        ev.preventDefault();

        const file = fileInputRef.current.files[0];
        const sendFile = fetch(endpoint, {
            method: "POST",
            body: file,
        });

        sendFile
            .then((resp) => resp.text())
            .then((data) => setStatus(data));
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input ref={fileInputRef} type="file" name="image" id="image" />
                <input type="submit" value="Submit" />
            </form>

            <div>{status}</div>
        </div>
    );
}
