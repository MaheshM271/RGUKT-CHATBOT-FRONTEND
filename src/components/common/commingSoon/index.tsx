import { Flex } from "ui-library/flex";
import { ModalContainer } from "./styles";
import { H1, Subtext } from "ui-library/typography";

interface Props {
    clientView?: boolean;
}

export const ComingSoon = ({clientView}: Props) => {

    return (
        <ModalContainer clientView={clientView}  centered>
            <Flex flexDirection="column" gap="1rem" centered>
                <Flex flexDirection="column" centered>
                    <Subtext color="#494a4c">WE'RE STILL</Subtext>
                    <H1 color="#143d59" fontWeight={600} fontSize="30px">Cooking Our Website.</H1>
                </Flex>
                <Flex flexDirection="column" gap="0.5rem" centered>
                    <Subtext color="#7D7E81">We are going to launch this feature soon.</Subtext>
                    <Subtext color="#7D7E81">Stay Tuned.</Subtext>
                </Flex>
            </Flex>
        </ModalContainer>
    );
}