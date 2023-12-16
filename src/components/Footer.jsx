import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer
      style={{
        color: '#dbbc14',
        textAlign: 'center',
        padding: '20px 0',
        zIndex: 100,
      }}
    >
      <Typography variant="subtitle1">
        Copyright © 2023 Coin Lizard Inc. <br />
        All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
