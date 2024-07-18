import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ImagePicker } from './ImagePicker';

describe('ImagePicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render successfully', () => {
    const setFiles = jest.fn();

    const { container } = render(
      <ImagePicker
        files={null}
        id="image-picker"
        label="Choose an image"
        name="image"
        setFiles={setFiles}
      />,
    );

    expect(screen.getByLabelText('Choose an image')).toBeTruthy();
    expect(container.querySelector('.ImagePicker-preview')).toBeNull();
  });

  test('should set files when input value changes', () => {
    const setFiles = jest.fn();

    render(
      <ImagePicker
        files={null}
        id="image-picker"
        label="Choose an image"
        name="image"
        setFiles={setFiles}
      />,
    );

    const file = new File(['yolo'], 'yolo.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText('Choose an image') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(setFiles).toHaveBeenCalledWith(input.files);
  });

  test('should preview the selected image', async () => {
    const setFiles = jest.fn();

    const { rerender } = render(
      <ImagePicker
        files={null}
        id="image-picker"
        label="Choose an image"
        name="image"
        setFiles={setFiles}
      />,
    );

    const file = new File(['yolo'], 'yolo.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText('Choose an image');
    fireEvent.change(input, { target: { files: [file] } });

    setFiles.mockImplementation((files) => {
      rerender(
        <ImagePicker
          files={files}
          id="image-picker"
          label="Choose an image"
          name="image"
          setFiles={setFiles}
        />,
      );
    });

    setFiles([file]);

    await waitFor(() => {
      expect(screen.getByAltText('Preview')).toBeTruthy();
    });
  });

  test('should clear the preview when files are null', async () => {
    const setFiles = jest.fn();

    const file = new File(['yolo'], 'yolo.png', {
      type: 'image/png',
    });

    const { rerender } = render(
      <ImagePicker
        files={[file] as unknown as FileList}
        id="image-picker"
        label="Choose an image"
        name="image"
        setFiles={setFiles}
      />,
    );

    await waitFor(() => {
      expect(screen.queryByAltText('Preview')).toBeTruthy();
    });

    setFiles.mockImplementation((files) => {
      rerender(
        <ImagePicker
          files={files}
          id="image-picker"
          label="Choose an image"
          name="image"
          setFiles={setFiles}
        />,
      );
    });

    setFiles(null);

    await waitFor(() => {
      expect(screen.queryByAltText('Preview')).toBeNull();
    });
  });
});
