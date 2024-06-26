import React, { useState } from 'react';
import Dropdown from './dropdown';
import { CLUSTER_LIST } from 'services/chatService';
import styled from 'styled-components';
import { ArrorwRight } from 'icons/Arrows';
import AdvancedConfig from './accordion';

const ModalContainer = styled.div`
    visibility: ${props => props.$visible ? 'visible' : 'hidden'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalCard = styled.div`
    position: relative;
    width: 320px;
    background-color: white;
    border-radius: 16px;
    padding: 0px 36px;
    padding-bottom: 36px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const TitleContainer = styled.div`
    flex: 0;
    color: #495057;
    margin-bottom: 32px;
    font-size: 28px;
    font-weight: 800;
    margin: 32px 0px;
`

const ConfigContainer = styled.div`
    position: relative;
    max-width: 100%;
    margin-bottom: 28px;
`

const PhoneInput = styled.input`
    position: relative;
    vertical-align: bottom;
    border: 2px solid #495057;
    border-radius: 24px;
    padding: 4px 18px;
    align-self: center;
    width: 100%;
    height: 40px;
    font-size: 21px;
    box-sizing: border-box;
`;

const ConfirmButton = styled.button`
    height: 80%;
    aspect-ratio: 1;
    border: 1px solid #495057;
    background-color: #495057;
    border-radius: 50%;

    position: absolute;
    top: 10%;
    right: 0px;
    transform: translateX(-10%);

    &:hover {
        transform: translateX(-10%) scale(1.15);
    }
`;

const DropdownLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
`

const FilterCodeLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
`

const FilterCodeInput = styled.input`
    width: 90px;
`

const Modal = ({ onConfirm, showModal }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCluster, setSelectedCluster] = useState('');
    const [filterCode, setFilterCode] = useState("1")

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        // Replace any non-digit character with an empty string and limit the length to 10
        const filteredValue = value.replace(/\D/g, '').slice(0, 10);
        setPhoneNumber(filteredValue);
    };


    const handleClusterChange = (cluster) => {
        setSelectedCluster(cluster);
    };


    const validatePhoneNumber = () => {
        // Implement your phone number validation logic here
        // Return true if the phone number is valid, false otherwise
        if (phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber)) {
            console.log("Phone number is valid:", phoneNumber);
            onConfirm(phoneNumber, selectedCluster, filterCode)
        } else {
            console.log("Invalid phone number:", phoneNumber);
            alert("Invalid phone number")
        }
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            validatePhoneNumber(phoneNumber);
        }
    };

    const validateFilterCode = (filterCode) => {
        return (/^\d+$/.test(filterCode)) || filterCode === ""
    }

    const handleSetFilterCode = (event) => {
        if (validateFilterCode(event.target.value)) {
            setFilterCode(event.target.value)
        } else {
            alert(`Invalid filter code:${event.value}`)
        }
    }

    return (
        <ModalContainer $visible={showModal}>
            <ModalCard>
                <TitleContainer> Welcome to Voistory! </TitleContainer>
                <ConfigContainer>
                    <PhoneInput
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        onKeyUp={handleKeyPress}
                        placeholder="Enter your phone number"
                    />
                    <ConfirmButton onClick={validatePhoneNumber}>
                        <ArrorwRight />
                    </ConfirmButton>
                </ConfigContainer>
                <AdvancedConfig>
                    <DropdownLabel>Target Cluster: </DropdownLabel>
                    <Dropdown
                        options={CLUSTER_LIST}
                        optionPlaceholder={'Select a cluster'}
                        onChange={handleClusterChange}
                    />
                    <FilterCodeLabel>Filter Code:</FilterCodeLabel>
                    <FilterCodeInput
                        type="text"
                        value={filterCode}
                        onChange={handleSetFilterCode} />
                </AdvancedConfig>
            </ModalCard>
        </ModalContainer>
    );
};


export default Modal;