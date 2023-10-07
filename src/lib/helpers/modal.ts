import type { ModalSettings } from "@skeletonlabs/skeleton";

export const getModal: (selected: string) => ModalSettings = (selected: string) => ({
    type: 'confirm',
    // Data
    title: 'Please Confirm',
    body: `Are you sure you wish to delete ObjectId("${selected}")?`,
    // TRUE if confirm pressed, FALSE if cancel pressed
    response: (r: boolean) =>
    {
        console.log(selected);

        selected = '';
    }
});