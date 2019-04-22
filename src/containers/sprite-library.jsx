import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl, intlShape, defineMessages} from 'react-intl';
import VM from 'scratch-vm';

import {activateTab, COSTUMES_TAB_INDEX, BLOCKS_TAB_INDEX} from '../reducers/editor-tab';
import {
    openSpriteLibrary,
    closeSpriteLibrary
} from '../reducers/modals';
import sharedMessages from '../lib/shared-messages';

import spriteLibraryContent from '../lib/libraries/sprites.json';
import randomizeSpritePosition from '../lib/randomize-sprite-position';
import spriteTags from '../lib/libraries/sprite-tags';
import diySpriteLibraryContent from '../lib/libraries/diy-sprites.json'; // diy sprites
import {emptySprite} from '../lib/empty-assets';

import LibraryComponent from '../components/library/library.jsx';

const messages = defineMessages({
    libraryTitle: {
        defaultMessage: 'Choose a Sprite',
        description: 'Heading for the sprite library',
        id: 'gui.spriteLibrary.chooseASprite'
    }
});

class SpriteLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'handleFileUploadClick',
            'handlePaintSpriteClick'
        ]);
    }
    handleItemSelect (item) {
        // Randomize position of library sprite
        randomizeSpritePosition(item);
        this.props.vm.addSprite(JSON.stringify(item.json)).then(() => {
            this.props.onActivateBlocksTab();
        });
    }
    handleFileUploadClick(){
        this.fileInput.click();
    }
    handlePaintSpriteClick(){
        const formatMessage = this.props.intl.formatMessage;
        const emptyItem = emptySprite(
            formatMessage(sharedMessages.sprite, {index: 1}),
            formatMessage(sharedMessages.pop),
            formatMessage(sharedMessages.costume, {index: 1})
        );
        this.props.vm.addSprite(JSON.stringify(emptyItem)).then(() => {
            setTimeout(() => { // Wait for targets update to propagate before tab switching
                this.props.onActivateTab(COSTUMES_TAB_INDEX);
            });
        });
    }
    render () {
        return (
            <LibraryComponent
                data={spriteLibraryContent}
                diyDate={diySpriteLibraryContent}
                id="spriteLibrary"
                tags={spriteTags}
                title={this.props.intl.formatMessage(messages.libraryTitle)}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
                onFileUploadClick={this.handleFileUploadClick}
                onPaintSpriteClick={this.handlePaintSpriteClick}
            />
        );
    }
}

SpriteLibrary.propTypes = {
    intl: intlShape.isRequired,
    onActivateBlocksTab: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    onNewSpriteClick: e => {
        e.preventDefault();
        dispatch(openSpriteLibrary());
    },
    onActivateTab: tabIndex => {
        dispatch(activateTab(tabIndex));
    },
});

// export default injectIntl(SpriteLibrary);

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SpriteLibrary));
