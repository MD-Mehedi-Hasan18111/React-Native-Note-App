export type navigationProps = {
  navigation: {
    navigate: (text: string) => void;
  };
};

export type HomeProps = {
  navigation: {
    navigate: (text: string) => void;
  };
  uid: string;
  email: string;
};

export type noteListProps = {
  note: string;
  uid: string;
  id: string;
}[];

export type UIDProps = {
  uid: string;
};
