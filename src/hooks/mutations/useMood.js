import { useMutation } from "@tanstack/react-query"

export const useMoodMutation = () => {

    return useMutation({

        mutationFn: (data) => registerMood(data),
        onSuccess: (response) => [

        ],
        onError: (error) => {
            alert(error.message);
        }
    });
}