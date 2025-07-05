import Img from 'assets/images';
import { Container, ImageTitle } from './style';

interface Props {
  isUrl?: boolean;
  image: string;
  title: string;
}

export const ImageContainer = ({ isUrl, image, title }: Props) => {


  return (
    <Container gap='0.5rem' flexDirection='column'>
      {
        isUrl ? <img src={image} alt='url' />: <Img name={image} />
      }
      <ImageTitle style={{textAlign: "left"}}>{title}</ImageTitle>
    </Container>
  )
}
