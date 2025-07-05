import { Flex } from 'ui-library/flex';
import './template.css';
import { Logo } from 'components/common/logo';
import Img from 'assets/images';

export const AuthTemplate = ({ children, imageName, hideImage }: { children: React.ReactNode, imageName: string; hideImage?: boolean }) => {
  return (
    <Flex marginTop='3rem' className='authTemplateContianer' flexDirection='column'>
      <Logo isSignup />
      <Flex justifyContentCenter gap="1rem" className='authImgContainer'>
        {
          !hideImage && (
            <Flex className='authImage'>
              <Img name={imageName} />
            </Flex>
          )
        }
        <Flex centered flexDirection='column' >
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}