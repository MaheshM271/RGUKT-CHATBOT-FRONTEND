import { Subtext } from "ui-library/typography"


export const Error = ({ error }: { error: string }) => {

  if (!error) return null;
  return (
    <Subtext color="#CE5B52">
      {error}
    </Subtext>
  );
}