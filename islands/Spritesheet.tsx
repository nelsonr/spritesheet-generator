/** @jsx h */
import { createRef, h } from "preact";
import { useState } from "preact/hooks";

type Preview = {
    image: Blob | null;
    css: string | null;
};

export default function Spritesheet() {
    const [preview, setPreview] = useState<Preview>({ image: null, css: null });

    const fileInputRef = createRef();
    const endpoint = "/api/spritesheet";

    const onSubmit = (ev: Event) => {
        ev.preventDefault();

        const files: File[] = fileInputRef.current.files;

        if (files.length < 1) {
            return false;
        }

        const formData = new FormData();

        for (const file of files) {
            formData.append("images", file);
        }

        const sendFile = fetch(endpoint, {
            method: "POST",
            body: formData,
        });

        sendFile
            .then((resp) => resp.formData())
            .then((data: FormData) => {
                const preview: Preview = {
                    image: data.get("image") as Blob,
                    css: data.get("css") as string,
                };

                setPreview(preview);
            });
    };

    const ImagePreview = () => {
        if (preview.image) {
            const imageURL = URL.createObjectURL(preview.image);
            const image = document.createElement("img");
            image.src = imageURL;

            console.log(image);

            return <img src={imageURL} />;
        }

        return null;
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input ref={fileInputRef} type="file" name="image" id="image" multiple />
                <input type="submit" value="Submit" />
            </form>

            <div>
                <pre>{preview.css}</pre>
                <ImagePreview />
            </div>
        </div>
    );
}
