import { Input } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import { Subtext } from '../typography';

type IProps = {
  label?: string;
};

type SearchComponentProps = InputProps & IProps & Required<Pick<InputProps, 'onChange'>>;

export const Search = ({ onChange, label, size = 'large', ...rest }: SearchComponentProps) => (
  <>
    {label && <Subtext className="m-b-xs">{label}</Subtext>}
    <Input
      onChange={onChange}
      {...rest}
      size={size}
    />
  </>
);

// To search on the server side
export const SearchV2 = Input.Search;
