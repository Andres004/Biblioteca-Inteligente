import React from 'react';

export type ErrorMessageProps = {
    message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
    <div>
        <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>
    </div>
    );
}
