import {defineMessages} from 'react-intl';

export default defineMessages({
    backdrop: {
        defaultMessage: 'backdrop{index}',
        description: 'Default name for a new backdrop, scratch will automatically adjust the number if necessary',
        id: 'gui.sharedMessages.backdrop'
    },
    costume: {
        defaultMessage: 'costume{index}',
        description: 'Default name for a new costume, scratch will automatically adjust the number if necessary',
        id: 'gui.sharedMessages.costume'
    },
    costume2: {
        defaultMessage: 'Mabot',
        description: 'Default name for a new costume, scratch will automatically adjust the number if necessary',
        id: 'gui.sharedMessages.costume2'
    },
    sprite: {
        defaultMessage: 'Sprite{index}',
        description: 'Default name for a new sprite, scratch will automatically adjust the number if necessary',
        id: 'gui.sharedMessages.sprite'
    },
    sprite2: {
        defaultMessage: 'Mabot',
        description: 'Default name for a new sprite, scratch will automatically adjust the number if necessary',
        id: 'gui.sharedMessages.sprite2'
    },
    pop: {
        defaultMessage: 'pop',
        description: 'Name of the pop sound, the default sound added to a sprite',
        id: 'gui.sharedMessages.pop'
    },
    replaceProjectWarning: {
        id: 'gui.sharedMessages.replaceProjectWarning',
        defaultMessage: 'Replace contents of the current project?',
        description: 'Confirmation that user wants to overwrite the current project contents'
    }
});
