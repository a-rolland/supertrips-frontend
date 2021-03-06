import styled from "styled-components";

export const StyledExperience = styled.div`
  @keyframes slide-up {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: slide-up 0.65s ease-in-out forwards;
`;

export const OwnerControls = styled.p`
  svg {
    margin: 0 10px;
  }
`;

export const StyledStepHeader = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const Ul = styled.ul`
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Box = styled.div`
  margin: 0 auto;
`;

export const Li = styled.li`
  margin: 10px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin: 0 10px;
    padding-top: 4px;
  }
`;

export const StyledDateTime = styled.span`
  margin: 15px 5px 5px 40px;
  display: block;
  opacity: ${(props) => props.opacity};
`;

export const Description = styled.p`
  margin: 20px;
  margin-left: 50px;
`;

export const AddPhotoLogo = styled.span`
  margin: 15px 5px 5px 40px;
  display: block;

  &:hover {
    cursor: pointer;
    color: lightgrey;
  }
`;

export const EditPhotoLogo = styled.span`
  margin: 15px 5px 5px 40px;
  display: block;

  &:hover {
    cursor: pointer;
    color: lightgrey;
  }
`;

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PicturesContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const SinglePictureContainer = styled.div`
  position: relative;
  text-align: center;

  img {
    height: 125px;
    width: auto;
    margin: 20px;

    @media (max-width: 767px) {
      height: 75px;
      width: auto;
      margin: 10px;
    }

    @media (min-width: 992px) {
      height: 150px;
      width: auto;
      margin: 20px;
    }
  }

  svg {
    position: absolute;
    top: 10%;
    left: 10%;
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 25%;
    padding: 3px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ExpandedSection = styled.div`
  width: 90vw;
`;

export const ExperienceTitle = styled.span`
  :hover {
    color: lightgrey;
  }
`;

export const GalleryAndPictures = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    margin-top: 40px;
    justify-self: center;
    align-self: center;
  }
`;
