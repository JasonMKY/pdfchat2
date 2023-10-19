"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ExpandIcon, Loader2 } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Page, Document } from "react-pdf";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";

interface PdfFullScreenProps {
  fileUrl: string;
}

const Pdffullscreen = ({ fileUrl }: PdfFullScreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();

  const { toast } = useToast();

  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) setIsOpen(visible);
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button aria-label="fullscreen" variant="ghost" className="gap-1.5">
          <ExpandIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-7xl">
        <SimpleBar autoHide={false} className="mt-6 max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading PDF.",
                  description: "Please try again later.",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              file={fileUrl}
              className="max-h-full"
            >
              {new Array(numPages).fill(0).map((_, index) => (
                <Page
                  key={index}
                  width={width ? width : 1}
                  pageNumber={index + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default Pdffullscreen;
