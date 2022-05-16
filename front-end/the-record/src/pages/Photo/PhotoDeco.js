import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageEditor from '@toast-ui/react-image-editor';
import Navigation from '../../components/Navigation';

import 'tui-image-editor/dist/tui-image-editor.css';

import PhotoList from '../../components/Album/PhotoList';
import '../../styles/photo/album.css';

// import TuiImageEditor from 'tui-image-editor';
// import 'tui-image-editor/dist/tui-image-editor.css';
// import 'tui-color-picker/dist/tui-color-picker.css';

function PhotoDeco() {
  const editorRef = useRef();
  const navigate = useNavigate();

  const myTheme = {
    'common.bisize.width': '0',
    'common.bisize.height': '0',
    'common.backgroundColor': '#fff',

    //     // header
    //     'header.backgroundImage': 'none',
    //     'header.backgroundColor': 'transparent',
    //     'header.border': '0px',

    //     // load button
    //     'loadButton.backgroundColor': '#fff',
    //     'loadButton.border': '1px solid #ddd',
    //     'loadButton.color': '#222',
    //     'loadButton.fontFamily': "'Noto Sans', sans-serif",
    //     'loadButton.fontSize': '12px',

    //     // download button
    //     'downloadButton.backgroundColor': '#fdba3b',
    //     'downloadButton.border': '1px solid #fdba3b',
    //     'downloadButton.color': '#fff',
    //     'downloadButton.fontFamily': "'Noto Sans', sans-serif",
    //     'downloadButton.fontSize': '12px',

    //     // main icons
    //     'menu.normalIcon.color': '#8a8a8a',
    //     'menu.activeIcon.color': '#555555',
    //     'menu.disabledIcon.color': '#434343',
    //     'menu.hoverIcon.color': '#e9e9e9',
    //     'menu.iconSize.width': '24px',
    //     'menu.iconSize.height': '24px',

    //     // submenu icons
    //     'submenu.normalIcon.color': '#8a8a8a',
    //     'submenu.activeIcon.color': '#555555',
    //     'submenu.iconSize.width': '32px',
    //     'submenu.iconSize.height': '32px',

    // submenu primary color
    // 'submenu.backgroundColor': 'transparent',
    // 'submenu.partition.color': '#e5e5e5',

    // submenu labels
    // 'submenu.normalLabel.color': '#858585',
    // 'submenu.normalLabel.fontWeight': 'normal',
    // 'submenu.activeLabel.color': '#000',
    // 'submenu.activeLabel.fontWeight': 'normal',

    //     // checkbox style
    //     'checkbox.border': '1px solid #ccc',
    //     'checkbox.backgroundColor': '#fff',

    //     // rango style
    //     'range.pointer.color': '#333',
    //     'range.bar.color': '#ccc',
    //     'range.subbar.color': '#606060',

    //     'range.disabledPointer.color': '#d3d3d3',
    //     'range.disabledBar.color': 'rgba(85,85,85,0.06)',
    //     'range.disabledSubbar.color': 'rgba(51,51,51,0.2)',

    //     'range.value.color': '#000',
    //     'range.value.fontWeight': 'normal',
    //     'range.value.fontSize': '11px',
    //     'range.value.border': '0',
    //     'range.value.backgroundColor': '#f5f5f5',
    //     'range.title.color': '#000',
    //     'range.title.fontWeight': 'lighter',

    //     // colorpicker style
    //     'colorpicker.button.border': '0px',
    //     'colorpicker.title.color': '#000',
    //   };
    //   const ImageEditor = require('tui-image-editor');
    //   const instance = new ImageEditor(
    //     document.querySelector('#tui-image-editor'),
    //     {
    //       cssMaxWidth: 700,
    //       cssMaxHeight: 500,
    //       selectionStyle: {
    //         cornerSize: 20,
    //         rotatingPointOffset: 70,
    //       },
    //     },
  };

  const uploadPhotoList = () => {
    const canvas = document.querySelector('.lower-canvas');
    console.log(canvas);
    const dataURL = canvas.toDataURL('image/png');
    console.log(dataURL);

    navigate('/album/photodeco/upload', { state: dataURL });
  };
  return (
    <div id="album">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <div>
          <ImageEditor
            ref={editorRef}
            includeUI={{
              theme: myTheme,
              menu: [
                'crop',
                'flip',
                'rotate',
                'draw',
                'shape',
                'icon',
                'text',
                'filter',
              ],
              initMenu: 'filter',
              uiSize: {
                width: '900px',
                height: '500px',
              },
              menuBarPosition: 'left',
            }}
            cssMaxHeight={500}
            cssMaxWidth={700}
            selectionStyle={{
              cornerSize: 20,
              rotatingPointOffset: 70,
            }}
            usageStatistics={false}
          />
        </div>
        <button type="button" onClick={uploadPhotoList}>
          사진첩에 올리기
        </button>
        <Navigation />
      </div>
    </div>
  );
}

export default PhotoDeco;
