import React from 'react';
import { useContent } from 'translation-helps-rcl';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ProscommaSearch from './ProscommaSearch';
import { ReferenceContext, AppContext } from '../../context';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Search() {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('благ');

  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = React.useContext(ReferenceContext);

  const { bookId, chapter } = referenceSelected;

  const {
    state: { appConfig, resourcesApp },
  } = React.useContext(AppContext);

  // const currentResources =
  //   resourcesApp &&
  //   appConfig &&
  //   resourcesApp.filter((e) => appConfig.lg.map((e) => e.i).includes(e.name));
  // const { languageId,name , owner } = currentResources && currentResources[0];
  const classes = useStyles();
  const languageId = 'ru';
  const name = 'ru_rlob';
  const owner = 'ru_gl';

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      setSearch(value);
      setOpen(true);
    }
  };
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyPress={(e) => handleKeyPress(e)}
        />
      </div>
      <ProscommaSearch
        referenceSelected={referenceSelected}
        searchText={search}
        open={open}
        handleClose={handleClose}
        languageId={languageId}
        name={name}
        owner={owner}
        goToBookChapterVerse={goToBookChapterVerse}
      />
    </>
  );
}

export default Search;
