# use-test-rerender

> React hook for testing re render of components

[![npm version](https://badge.fury.io/js/use-test-rerender.svg)](https://badge.fury.io/js/use-test-rerender)

## How to use

1. Install hook:
`npm install use-test-rerender`

2. Add a special attribute from `useTestRerender` to the component you want to test for unnecessary re-renders
```javascript
import {useTestRerender} from 'use-test-rerender';

export default memo(function MyComponent({ content }) {
  const testRerenderAttribute = useTestRerender();

  return (
    <div data-testid="my-component" {...testRerenderAttribute.bind}>
      {{ content }}
    </div>
  )
}, (prevProps, nextProps) => {
    return prevProps.content === nextProps.content
});
```

3. Add tests to re-render this component by checking the value of `TEST_RERENDER_ATTRIBUTE_NAME`
```javascript
import {TEST_RERENDER_ATTRIBUTE_NAME} from 'use-test-rerender';

const testProps1 = {
  content: 'test contend 1'
};
const testProps2 = {
  content: 'test contend 2'
};

function create(propsData: TermsItemProperties) {
  const template = (propsData: TermsItemProperties) => (
    <MyComponent {...propsData}/>
  );

  const {rerender} = render(template(propsData));

  const rerenderComponent = (propsData: TermsItemProperties) => rerender(template(propsData));

  return {page: new ComponentPageObject(), rerenderComponent};
}

class ComponentPageObject {
  get myComponent() {
    return screen.getByTestId('my-component');
  }
};

describe('Component', () => {
  it('is updated when props data changed', () => {
    // Arrrange
    const {page, rerenderComponent} = create(testProps1);

    // Act
    rerenderComponent(testProps2);
  
    // Assert
    expect(page.myComponent).toHaveAttribute(TEST_RERENDER_ATTRIBUTE_NAME, '1')
  });

  it('isn\'t re rendered when props data changed if they\'re the same', () => {
    // Arrange
    const { page, rerenderComponent}  = create(testProps1);

    // Act
    rerenderComponent(testProps1);
    
    // Assert
    expect(page.myComponent).toHaveAttribute(TEST_RERENDER_ATTRIBUTE_NAME, '0')
  });
});
```
