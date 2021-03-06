import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DatePicker, Space, Dropdown, Menu, Button, Modal } from "antd";
import "antd/dist/antd.css";
import { API } from "../../../../config";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareMinus,
  faSquarePlus,
  faUser,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

const { RangePicker } = DatePicker;

const DetailOptional = ({ params }) => {
  const [numberOfAdult, setNumberOfAdult] = useState(2);

  const [numberOfChild, setNumberOfChild] = useState(0);

  const [visible, setVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalId, setModalId] = useState();

  const [rooms, setRooms] = useState([]);

  const [startDate, setStartDate] = useState();

  const [endDate, setEndDate] = useState();

  const navigate = useNavigate();

  const location = useLocation();

  const sumOfGuest = numberOfAdult + numberOfChild;

  useEffect(() => {
    fetch(`${API.PRODUCTS}/${params.id}/rooms${location.search}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => setRooms(res.rooms));
  }, [location.search, params.id]);
  if (!rooms[0]) return;

  const modalHandle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const visibleHandle = () => setVisible(!visible);

  const onChange = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const requestNewRooms = () => {
    navigate(
      `?start_date=${startDate}&end_date=${endDate}&guests=${sumOfGuest}`
    );
  };
  const plusNumberOfAdult = () => setNumberOfAdult(numberOfAdult + 1);

  const minusNumberOfAdult = () =>
    numberOfAdult && setNumberOfAdult(numberOfAdult - 1);

  const plusNumberOfChild = () => setNumberOfChild(numberOfChild + 1);

  const minusNumberOfChild = () =>
    numberOfChild && setNumberOfChild(numberOfChild - 1);

  const roomsIndex = modalId - 1;

  const goToBooking = roomsId => {
    navigate(
      `/Booking?room_id=${roomsId}&start_date=${startDate}&end_date=${endDate}&guests=${sumOfGuest}`
    );
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Guest>
              ??????
              <Icon
                icon={faCircleXmark}
                onClick={visibleHandle}
                style={{ marginRight: "8px" }}
              />
            </Guest>
          ),
        },
        {
          key: "2",
          label: (
            <Guest>
              <div>?????? </div>
              <GuestNumber>
                <Icon icon={faSquarePlus} onClick={plusNumberOfAdult} />
                <div>{numberOfAdult}</div>
                <Icon icon={faSquareMinus} onClick={minusNumberOfAdult} />
              </GuestNumber>
            </Guest>
          ),
        },
        {
          key: "3",
          label: (
            <Guest>
              <div>?????????</div>
              <GuestNumber>
                <Icon icon={faSquarePlus} onClick={plusNumberOfChild} />
                <div>{numberOfChild}</div>
                <Icon icon={faSquareMinus} onClick={minusNumberOfChild} />
              </GuestNumber>
            </Guest>
          ),
        },
      ]}
    />
  );

  return (
    <SearchOptionContainer>
      <ChoseOption>
        <DateContainer>
          <Space direction="vertical" size={12}>
            <RangePicker onChange={onChange} style={{ width: "300px" }} />
          </Space>
        </DateContainer>
        <Space direction="vertical">
          <Dropdown
            placement="bottomLeft"
            overlay={menu}
            trigger={["click"]}
            visible={visible}
            onClick={visibleHandle}
          >
            <Button
              style={{
                width: "229px",
                height: "34px",
                display: "flex",
                flexDirection: "flexEnd",
              }}
            >
              <Icon icon={faUser} style={{ margin: "0 10px" }} />
              {sumOfGuest} ???
            </Button>
          </Dropdown>
        </Space>
        <SearchButton onClick={() => requestNewRooms()}>?????????</SearchButton>
      </ChoseOption>
      {rooms.map(data => {
        return (
          <OptionalResult key={data.id}>
            <ResultMain>
              <ResultImage
                src={data.images[0].url}
                onClick={() => {
                  modalHandle();
                  setModalId(data.id);
                }}
              />
              <MainTextContainer>
                <TitleText>
                  {data.name}
                  <DetailResultButton
                    onClick={() => {
                      modalHandle();
                      setModalId(data.id);
                    }}
                  >
                    ?????????
                  </DetailResultButton>
                </TitleText>
                <GuestText>
                  ?????? {data.min_guests}??? ,?????? {data.max_guests}???
                </GuestText>
              </MainTextContainer>
            </ResultMain>
            <ResultMain>
              <SubTextContainer>
                <SubText>{data.name} ?????? only</SubText>
                <PriceText>
                  <Price>{data.price.toLocaleString()}???</Price>
                  <GoToReserve onClick={() => goToBooking(data.id)}>
                    ??????
                  </GoToReserve>
                </PriceText>
              </SubTextContainer>
            </ResultMain>
          </OptionalResult>
        );
      })}
      <Modal
        title={modalId && rooms[roomsIndex].name}
        centered
        visible={isModalOpen}
        onOk={modalHandle}
        onCancel={modalHandle}
        width={500}
      >
        {modalId && (
          <>
            <RoomsModalImg
              src={rooms[roomsIndex].images[0].url}
              alt="modalImg"
            />
            <ModalTitle>??????</ModalTitle>
            <ModalContent>
              ?????? {rooms[roomsIndex].min_guests} ???, ??????{" "}
              {rooms[roomsIndex].max_guests} ???
            </ModalContent>
            <ModalTitle>????????????</ModalTitle>
            <ModalContent>2022??? 7??? 19????????? 100% ????????????</ModalContent>
            <ModalTitle>????????????</ModalTitle>
            <ModalContent>
              ?????????, ????????? TV, ?????????, ???????????? <br /> ??????, ????????????, ??????,
              ???????????? ????????????, ??????, ?????? <br /> ?????? Wi-Fi ?????? ????????????
              ??????????????? ?????? ???????????? ???????????????. <br />
            </ModalContent>
            <ModalTitle>?????? ?????? ??????</ModalTitle>
            <ModalContent>
              ????????? 1?????? ~ ????????? ????????????: ???????????? <br /> ????????? 2??????
              17?????????: 50% ?????? <br /> ????????? 3?????? 17?????????: 70% ?????? <br />
              ????????? 8?????? 17?????????: 100% ?????? <br />
              ?????? ????????? ??????????????? ?????? ????????? ????????????, ????????? ???????????? ??????
              <br />
              ??????????????? ?????? ?????? ????????????.
            </ModalContent>
          </>
        )}
      </Modal>
    </SearchOptionContainer>
  );
};

const SearchOptionContainer = styled.div`
  width: 700px;
`;

const ChoseOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  height: 100px;
  padding: 25px;
  border: 1px solid #e4e5e5;
  margin-bottom: 30px;
`;

const DateContainer = styled.div`
  position: relative;
`;

const Guest = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin: 10px 0;
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: ${props => props.theme.mainColor};
`;

const GuestNumber = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 85px;
`;

const SearchButton = styled.button`
  width: 84px;
  height: 45px;
  color: ${props => props.theme.mainColor};
  background-color: rgba(99, 178, 241, 0.2);
  border: none;
  &:hover {
    transition: 0.5s;
    filter: brightness(80%);
    cursor: pointer;
  }
`;

const OptionalResult = styled.div`
  margin: 20px 0;
`;

const ResultMain = styled.div`
  display: flex;
  border: 1px solid #e4e5e5;
  width: 700px;
  height: 170px;
  padding: 24px;
`;

const ResultImage = styled.img`
  width: 180px;
  height: 120px;
  &:hover {
    cursor: pointer;
  }
`;

const MainTextContainer = styled.div`
  margin-left: 15px;
`;

const TitleText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 450px;
  margin-top: 20px;
`;

const GuestText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 450px;
  margin-top: 20px;
  font-size: 12px;
  color: gray;
`;

const DetailResultButton = styled.button`
  width: 60px;
  height: 30px;
  background-color: white;
  border: none;
  color: ${props => props.theme.mainColor};
  &: hover {
    cursor: pointer;
  }
`;

const SubText = styled.div`
  width: 645px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
`;

const PriceText = styled.div`
  width: 645px;
  display: flex;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: 30px;
`;

const SubTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const GoToReserve = styled.button`
  width: 60px;
  height: 35px;
  border: none;
  color: white;
  background-color: ${props => props.theme.mainColor};
`;

const RoomsModalImg = styled.img`
  width: 450px;
  height: 400px;
`;

const ModalTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const ModalContent = styled.div`
  font-size: 12px;
`;

export default DetailOptional;
