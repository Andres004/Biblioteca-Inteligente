type Props = {
  message: string;
};

export function ErrorMessage({ message }: Props) {
  return (
    <div>
      <p style={{ color: 'var(--danger-color)', fontWeight: 'bold' }}>{message}</p>
    </div>
  );
}
