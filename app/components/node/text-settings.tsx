import { useNode } from '@craftjs/core';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { TextProps } from './text';

export const TextSettings = () => {
  const {
    actions: { setProp },
    props
  } = useNode(node => ({
    props: node.data.props as Partial<TextProps>
  }));

  return (
    <div className='space-y-4 p-4'>
      <div className='space-y-2'>
        <Label htmlFor='fontSize'>Font Size (px)</Label>
        <Input
          id='fontSize'
          type='number'
          value={props.fontSize || 16}
          onChange={e => setProp((props: any) => (props.fontSize = e.target.value))}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='fontWeight'>Font Weight</Label>
        <Select
          value={props.fontWeight || 'normal'}
          onValueChange={value => setProp((props: any) => (props.fontWeight = value))}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select font weight' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='normal'>Normal</SelectItem>
            <SelectItem value='bold'>Bold</SelectItem>
            <SelectItem value='lighter'>Lighter</SelectItem>
            <SelectItem value='bolder'>Bolder</SelectItem>
            <SelectItem value='100'>100</SelectItem>
            <SelectItem value='200'>200</SelectItem>
            <SelectItem value='300'>300</SelectItem>
            <SelectItem value='400'>400</SelectItem>
            <SelectItem value='500'>500</SelectItem>
            <SelectItem value='600'>600</SelectItem>
            <SelectItem value='700'>700</SelectItem>
            <SelectItem value='800'>800</SelectItem>
            <SelectItem value='900'>900</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='textAlign'>Text Align</Label>
        <Select
          value={props.textAlign || 'left'}
          onValueChange={value => setProp((props: any) => (props.textAlign = value))}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select text alignment' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='left'>Left</SelectItem>
            <SelectItem value='center'>Center</SelectItem>
            <SelectItem value='right'>Right</SelectItem>
            <SelectItem value='justify'>Justify</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='tagName'>HTML Tag</Label>
        <Select
          value={props.tagName || 'p'}
          onValueChange={value => setProp((props: any) => (props.tagName = value))}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select HTML tag' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='p'>Paragraph (p)</SelectItem>
            <SelectItem value='h1'>Heading 1 (h1)</SelectItem>
            <SelectItem value='h2'>Heading 2 (h2)</SelectItem>
            <SelectItem value='h3'>Heading 3 (h3)</SelectItem>
            <SelectItem value='h4'>Heading 4 (h4)</SelectItem>
            <SelectItem value='h5'>Heading 5 (h5)</SelectItem>
            <SelectItem value='h6'>Heading 6 (h6)</SelectItem>
            <SelectItem value='span'>Span</SelectItem>
            <SelectItem value='div'>Div</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='textColor'>Text Color</Label>
        <Input
          id='textColor'
          type='color'
          value={`#${(
            ((props.color?.r || 0) << 16) |
            ((props.color?.g || 0) << 8) |
            (props.color?.b || 0)
          )
            .toString(16)
            .padStart(6, '0')}`}
          onChange={e => {
            const hex = e.target.value.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            setProp((props: any) => (props.color = { r, g, b, a: 1 }));
          }}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='shadow'>Text Shadow</Label>
        <Input
          id='shadow'
          type='range'
          min='0'
          max='100'
          value={props.shadow || 0}
          onChange={e => setProp((props: any) => (props.shadow = parseInt(e.target.value)))}
        />
        <div className='text-sm text-gray-500'>Shadow: {props.shadow || 0}%</div>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <div className='space-y-2'>
          <Label htmlFor='marginTop'>Margin Top</Label>
          <Input
            id='marginTop'
            type='number'
            value={props.margin?.[0] || 0}
            onChange={e => {
              const newMargin = [...(props.margin || [0, 0, 0, 0])];
              newMargin[0] = parseInt(e.target.value) || 0;
              setProp((props: any) => (props.margin = newMargin));
            }}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='marginRight'>Margin Right</Label>
          <Input
            id='marginRight'
            type='number'
            value={props.margin?.[1] || 0}
            onChange={e => {
              const newMargin = [...(props.margin || [0, 0, 0, 0])];
              newMargin[1] = parseInt(e.target.value) || 0;
              setProp((props: any) => (props.margin = newMargin));
            }}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='marginBottom'>Margin Bottom</Label>
          <Input
            id='marginBottom'
            type='number'
            value={props.margin?.[2] || 0}
            onChange={e => {
              const newMargin = [...(props.margin || [0, 0, 0, 0])];
              newMargin[2] = parseInt(e.target.value) || 0;
              setProp((props: any) => (props.margin = newMargin));
            }}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='marginLeft'>Margin Left</Label>
          <Input
            id='marginLeft'
            type='number'
            value={props.margin?.[3] || 0}
            onChange={e => {
              const newMargin = [...(props.margin || [0, 0, 0, 0])];
              newMargin[3] = parseInt(e.target.value) || 0;
              setProp((props: any) => (props.margin = newMargin));
            }}
          />
        </div>
      </div>
    </div>
  );
};
