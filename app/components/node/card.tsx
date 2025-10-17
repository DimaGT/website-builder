import { Element } from '@craftjs/core';
import { SettingsControl } from '../settings-control';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { NodeButton } from './button';
import { withNode } from './connector';
import NodeText from './text';

interface NodeCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const draggable = true;
const droppable = true; // Can drop items into to this component

export const NodeCardHeader = withNode(CardHeader, {
  droppable
});

export const NodeCardTitle = withNode(CardTitle, {
  draggable,
  droppable
});

(NodeCardTitle as any).craft = {
  ...(NodeCardTitle as any).craft,
  related: {
    toolbar: SettingsControl
  }
};

export const NodeCardDescription = withNode(CardDescription, {
  draggable,
  droppable
});

(NodeCardDescription as any).craft = {
  ...(NodeCardDescription as any).craft,
  related: {
    toolbar: SettingsControl
  }
};

export const NodeCardContent = withNode(CardContent, {
  droppable
});

export const NodeCardFooter = withNode(CardFooter, {
  droppable
});

export const NodeCardContainer = withNode(Card, {
  draggable,
  droppable
});

export const NodeCard = ({ ...props }: NodeCardProps) => {
  return (
    <NodeCardContainer {...props}>
      <Element canvas id='card-header' is={NodeCardHeader as typeof NodeCardHeader & string}>
        <NodeCardTitle>
          <NodeText text='Card Title' tagName='h3' fontSize='16' fontWeight='bold' />
        </NodeCardTitle>
        <NodeCardDescription>
          <NodeText text='Card Description' tagName='p' fontSize='14' fontWeight='normal' />
        </NodeCardDescription>
      </Element>
      <Element
        canvas
        id='card-content'
        is={NodeCardContent as typeof NodeCardContent & string}
      ></Element>
      <Element canvas id='card-footer' is={NodeCardFooter as typeof NodeCardFooter & string}>
        <NodeButton>
          <NodeText
            text='Footer button'
            tagName='button'
            fontSize='14'
            fontWeight='normal'
            color={{ r: 255, g: 255, b: 255, a: 1 }}
          />{' '}
        </NodeButton>
      </Element>
    </NodeCardContainer>
  );
};

(NodeCard as any).craft = {
  ...(NodeCard as any).craft,
  displayName: 'Card',
  props: {
    className: 'p-6 m-2'
  },
  custom: {
    importPath: '@/components/card'
  },
  related: {
    toolbar: SettingsControl
  }
};
