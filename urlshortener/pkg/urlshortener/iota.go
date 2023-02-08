// Code generated by @apexlang/codegen. DO NOT EDIT.

package urlshortener

import (
	"context"
	"encoding/binary"

	"github.com/nanobus/iota/go/invoke"
	"github.com/nanobus/iota/go/msgpack"
	"github.com/nanobus/iota/go/payload"
	"github.com/nanobus/iota/go/proxy"
	"github.com/nanobus/iota/go/rx/mono"
	"github.com/nanobus/iota/go/transform"
)

type ShortenerShortenArgs struct {
	URL string `json:"url" yaml:"url" msgpack:"url"`
}

// DefaultShortenerShortenArgs returns a `ShortenerShortenArgs` struct populated
// with its default values.
func DefaultShortenerShortenArgs() ShortenerShortenArgs {
	return ShortenerShortenArgs{}
}

func (o *ShortenerShortenArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "url":
			o.URL, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *ShortenerShortenArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("url")
	encoder.WriteString(o.URL)

	return nil
}

type ShortenerLookupArgs struct {
	ID string `json:"id" yaml:"id" msgpack:"id"`
}

// DefaultShortenerLookupArgs returns a `ShortenerLookupArgs` struct populated with
// its default values.
func DefaultShortenerLookupArgs() ShortenerLookupArgs {
	return ShortenerLookupArgs{}
}

func (o *ShortenerLookupArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *ShortenerLookupArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("id")
	encoder.WriteString(o.ID)

	return nil
}

type RepositoryLoadByIdArgs struct {
	ID string `json:"id" yaml:"id" msgpack:"id"`
}

// DefaultRepositoryLoadByIdArgs returns a `RepositoryLoadByIdArgs` struct
// populated with its default values.
func DefaultRepositoryLoadByIdArgs() RepositoryLoadByIdArgs {
	return RepositoryLoadByIdArgs{}
}

func (o *RepositoryLoadByIdArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *RepositoryLoadByIdArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("id")
	encoder.WriteString(o.ID)

	return nil
}

type RepositoryLoadByURLArgs struct {
	URL string `json:"url" yaml:"url" msgpack:"url"`
}

// DefaultRepositoryLoadByURLArgs returns a `RepositoryLoadByURLArgs` struct
// populated with its default values.
func DefaultRepositoryLoadByURLArgs() RepositoryLoadByURLArgs {
	return RepositoryLoadByURLArgs{}
}

func (o *RepositoryLoadByURLArgs) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "url":
			o.URL, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *RepositoryLoadByURLArgs) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(1)
	encoder.WriteString("url")
	encoder.WriteString(o.URL)

	return nil
}

func (o *URL) Decode(decoder msgpack.Reader) error {
	numFields, err := decoder.ReadMapSize()
	if err != nil {
		return err
	}

	for numFields > 0 {
		numFields--
		field, err := decoder.ReadString()
		if err != nil {
			return err
		}
		switch field {
		case "id":
			o.ID, err = decoder.ReadString()
		case "url":
			o.URL, err = decoder.ReadString()
		default:
			err = decoder.Skip()
		}
		if err != nil {
			return err
		}
	}

	return nil
}

func (o *URL) Encode(encoder msgpack.Writer) error {
	if o == nil {
		encoder.WriteNil()
		return nil
	}
	encoder.WriteMapSize(2)
	encoder.WriteString("id")
	encoder.WriteString(o.ID)
	encoder.WriteString("url")
	encoder.WriteString(o.URL)

	return nil
}

func RegisterShortener(svc Shortener) {
	invoke.ExportRequestResponse("urlshortener.v1.Shortener", "shorten", shortenerShortenWrapper(svc))
}

func shortenerShortenWrapper(svc Shortener) invoke.RequestResponseHandler {
	return func(ctx context.Context, p payload.Payload) mono.Mono[payload.Payload] {
		inputArgs := DefaultShortenerShortenArgs()
		if err := transform.CodecDecode(p, &inputArgs); err != nil {
			return mono.Error[payload.Payload](err)
		}
		response := svc.Shorten(ctx, inputArgs.URL)
		return mono.Map(response, transform.MsgPackEncode[URL])
	}
}

type Dependencies struct {
	Repository Repository
}

type Client struct {
	caller                 invoke.Caller
	_opRepositoryLoadByID  uint32
	_opRepositoryLoadByURL uint32
	_opRepositoryStoreURL  uint32
}

func New(caller invoke.Caller) *Client {
	return &Client{
		caller:                 caller,
		_opRepositoryLoadByID:  invoke.ImportRequestResponse("urlshortener.v1.Repository", "loadById"),
		_opRepositoryLoadByURL: invoke.ImportRequestResponse("urlshortener.v1.Repository", "loadByURL"),
		_opRepositoryStoreURL:  invoke.ImportRequestResponse("urlshortener.v1.Repository", "storeURL"),
	}
}
func (c *Client) Dependencies() Dependencies {
	return Dependencies{
		Repository: c.Repository(),
	}
}

func GetDependencies(caller invoke.Caller) Dependencies {
	c := New(caller)
	return c.Dependencies()
}

type RepositoryClient struct {
	c          *Client
	instanceID uint64
}

func (c *Client) Repository() Repository {
	return &RepositoryClient{
		c: c,
	}
}

func (r *RepositoryClient) LoadByID(ctx context.Context, id string) mono.Mono[URL] {
	request := RepositoryLoadByIdArgs{
		ID: id,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[URL](err)
	}
	var metadata [16]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], r.c._opRepositoryLoadByID)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := r.c.caller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.MsgPackDecode[URL])
}

func (r *RepositoryClient) LoadByURL(ctx context.Context, url string) mono.Mono[URL] {
	request := RepositoryLoadByURLArgs{
		URL: url,
	}
	payloadData, err := msgpack.ToBytes(&request)
	if err != nil {
		return mono.Error[URL](err)
	}
	var metadata [16]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], r.c._opRepositoryLoadByURL)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := r.c.caller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.MsgPackDecode[URL])
}

func (r *RepositoryClient) StoreURL(ctx context.Context, url *URL) mono.Void {
	payloadData, err := msgpack.ToBytes(url)
	if err != nil {
		return mono.Error[struct{}](err)
	}
	var metadata [16]byte
	stream, ok := proxy.FromContext(ctx)
	binary.BigEndian.PutUint32(metadata[0:4], r.c._opRepositoryStoreURL)
	if ok {
		binary.BigEndian.PutUint32(metadata[4:8], stream.StreamID())
	}
	pl := payload.New(payloadData, metadata[:])
	future := r.c.caller.RequestResponse(ctx, pl)
	return mono.Map(future, transform.Void.Decode)
}
