import {useEffect, useState} from "react";
import Command from "./Command";

export default function useFetchCommands(filter: string, navigate: any): [Command[], boolean, (string | null), ((id: number) => void)] {
    const [commands, setCommands] = useState<Command[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost/api/v1/commands?status=${filter}`)
            .then(response => {
                if (response.status === 404) {
                    setErrorMessage('No commands found');
                    return [];
                }
                setErrorMessage(null);
                return response.json();
            })
            .then(data => {
                setCommands(data.data);
                setLoading(false);
            });
    }, [filter, navigate]);

    function handleToggle(id: number) {
        const updatedCommands = commands.map(command =>
            command.id === id ? { ...command, disabled: command.disabled ? 0 : 1 } : command
        );

        setCommands(updatedCommands);

        fetch(`http://localhost/api/v1/commands/toggle?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    }

    return [commands, loading, errorMessage, handleToggle];
}