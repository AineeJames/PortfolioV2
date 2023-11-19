export interface S3ImageBlob {
  url: string,
  width: number,
  height: number
}

export interface portfolioDataT {
  id: { N: string },
  orderIdx: { N: string },
  type: { S: string },
  projectHeading: { S: string },
  projectSubtitle: { S: string },
  projectDescription: { S: string },
  projectLink: { S: string },
  projectIcons: { SS: [string] },
  projectPicS3Key: { S: string }
}

export interface bioDataT {
  id: { N: string },
  orderIdx: { N: string },
  type: { S: string },
  pictureS3Key: { S: string },
  bioText: { S: string }
}

export interface ProjectDescriptionProps {
  text: string,
  startOffset: [number, number, number]
}

export interface LinkProps {
  url: string
  pos: [number, number, number]
}

export interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  [key: string]: string;
}

export interface ContactProps {
  yOffset: number
}

export interface IconProps {
  icon: string,
  position: [number, number, number],
  rotation?: [number, number, number],
  visible?: boolean,
  spin?: boolean,
  size?: number,
  color?: string,
  hoverColor?: string,
  action?: () => void
}

